const mongoose = require("mongoose");
const Chat = require("../models/chat");

async function main() {
  await mongoose.connect(
    "mongodb://127.0.0.1:27017/whatsappDB"
  );
}

main()
  .then(() => console.log("DB Connected"))
  .catch(console.log);

const chats = [
  {
    from: "Affan",
    to: "Ali",
    msg: "Hello Bro!",
  },
  {
    from: "Ahmed",
    to: "Usman",
    msg: "Assignment done?",
  },
  {
    from: "Sara",
    to: "Ayesha",
    msg: "Let's meet tomorrow.",
  },
  {
    from: "Hamza",
    to: "Bilal",
    msg: "Where are you?",
  },
  {
    from: "Talha",
    to: "Rehan",
    msg: "Call me.",
  },
  {
    from: "Noor",
    to: "Fatima",
    msg: "Check email.",
  },
  {
    from: "Saad",
    to: "Owais",
    msg: "Project submitted.",
  },
  {
    from: "Hira",
    to: "Mariam",
    msg: "Happy Birthday.",
  },
  {
    from: "Daniyal",
    to: "Shayan",
    msg: "See you soon.",
  },
  {
    from: "Zain",
    to: "Hassan",
    msg: "Good Morning.",
  },
];

async function initDB() {
  await Chat.deleteMany({});
  await Chat.insertMany(chats);
  console.log("Sample Data Inserted");
}

initDB();