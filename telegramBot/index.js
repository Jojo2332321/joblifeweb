const TelegramApi = require('node-telegram-bot-api')
const token = '6218719003:AAH4Z7wvTJbUMLvL5X1D3km6pM-wm2LRlic'
const bot = new TelegramApi(token,{polling:true})
const { Workers } = require('./models');
const sequelize = require('./db');
const chatState = {};
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    }catch (e){
        console.log('BD ERROR')
    }

    bot.setMyCommands([
        {command:'/start', description: 'start'},
        {command: '/auth', description: 'suth'},
        {command: '/shift', description: 'create expected shifts'}
        {command: '/showMyShifts', description: 'create expected shifts'}
    ])
    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text ==='/start') {
            return bot.sendMessage(chatId, `Hello`);
        }

        if (text ==='/auth') {
            return bot.sendMessage(chatId, `Enter yor auth code`);
        }

        if (text ==='/info'){
            return  bot.sendMessage(chatId, `privet yoba`)
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