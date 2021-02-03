const net = require('net')
const server = net.createServer(function (socket) {
    currentDate = new Date();
    currentYear = currentDate.getFullYear();
    currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    currentDay = currentDate.getDate().toString().padStart(2, "0");
    currentHour = currentDate.getHours().toString().padStart(2, "0");
    currentMin = currentDate.getMinutes().toString().padStart(2, "0");
    formattedDateTime = currentYear + "-" + currentMonth + "-" + currentDay + " " + currentHour + ":" + currentMin + '\n';
    socket.end(formattedDateTime)
}).listen(process.argv[2]);
