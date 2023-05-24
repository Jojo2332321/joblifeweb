const TelegramApi = require('node-telegram-bot-api')
const token = '6218719003:AAH4Z7wvTJbUMLvL5X1D3km6pM-wm2LRlic'
const bot = new TelegramApi(token,{polling:true})
const UserModel = require('./models');
const sequelize = require('./db');
const chatState = {};
const start = async () => {
/*
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    }catch (e){
        console.log('BD ERROR')
    }
*/

    bot.setMyCommands([
        {command:'/start', description: 'start'},
        {command: '/auth', description: 'auth'},
        {command: '/shift', description: 'create expected shifts'},
        {command: '/myshifts', description: 'show your shifts'},
    ])
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text ==='/start') {
            return bot.sendMessage(chatId, `Hello`);
        }

        if (text ==='/auth') {
            chatState[chatId] = { step: 'auth' };
            return bot.sendMessage(chatId, `Enter your auth code`);
        }

// ...

// Если пользователь находится в середине последовательности
        if (chatState[chatId]) {
            const state = chatState[chatId];

            // Обработка введенного кода аутентификации
            if (state.step === 'auth') {
                state.authCode = text;
                state.step = null;  // Очищаем состояние после получения кода

                // Проверка кода
                if (state.authCode === '123') {
                    return bot.sendMessage(chatId, `Your code is accepted`);
                } else {
                    return bot.sendMessage(chatId, `Invalid code, please try again.`);
                }
            }

            // ... другие обработчики состояния
        }

        if (text ==='/info'){
            return  bot.sendMessage(chatId, `privet yoba`)
        }

        if (text ==='/myshifts') {
            chatState[chatId] = { step: 'month' };
            return bot.sendMessage(chatId, `Enter the month number:`);
        }

        if (chatState[chatId]) {
            const state = chatState[chatId];

            // Обработка введенного месяца для команды /myshifts
            if (state.step === 'month') {
                state.month = text;
                state.step = null;  // Очищаем состояние после получения месяца

                // Фиксированный список смен для демонстрации
                const shifts = [
                    { shiftDate: '2023-05-01', startTime: '09:00', endTime: '18:00', company: 'Company A' },
                    { shiftDate: '2023-05-02', startTime: '09:00', endTime: '18:00', company: 'Company B' },
                    { shiftDate: '2023-05-03', startTime: '09:00', endTime: '18:00', company: 'Company C' },
                    // ... дополните этот список по вашему усмотрению
                ];

                if (shifts.length > 0) {
                    let response = 'Your shifts:\n';

                    shifts.forEach(shift => {
                        response += `Date: ${shift.shiftDate}, Start: ${shift.startTime}, End: ${shift.endTime}, Company: ${shift.company}\n`;
                    });

                    return bot.sendMessage(chatId, response);
                } else {
                    return bot.sendMessage(chatId, `No shifts found for the month ${state.month}.`);
                }
            }
        }

        if (text ==='/shift'){
            chatState[chatId] = { step: 'year' };
            return bot.sendMessage(chatId, `Enter the year:`);
        }

        // Если пользователь находится в середине последовательности
        if (chatState[chatId]) {
            const state = chatState[chatId];

            // Обработка введенного года
            if (state.step === 'year') {
                state.year = text;
                state.step = 'month';
                return bot.sendMessage(chatId, `Enter the month number:`);
            }

            // Обработка введенного месяца
            if (state.step === 'month') {
                state.month = text;
                state.step = 'days';
                return bot.sendMessage(chatId, `Enter the days, separated by comma:`);
            }

            // Обработка введенных дней
            if (state.step === 'days') {
                state.days = text.split(',').map(day => day.trim());

                // Составление даты в формате YYYY-MM-DD
                const dates = state.days.map(day => `${state.year}-${state.month}-${day}`);

                // Отображение дат в консоли
                console.log(`Dates for chat ${chatId}:`, dates);

                // Очистка состояния чата
                delete chatState[chatId];

                return bot.sendMessage(chatId, `You've selected the following dates: ${dates.join(', ')}`);
            }
        }
        return bot.sendMessage(chatId, 'command does not exist')
    })
}

start()