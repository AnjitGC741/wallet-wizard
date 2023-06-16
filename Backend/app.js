const express = require("express");
const cors = require("cors");
const { Customer } = require("./models");
const { Category } = require("./models");
const { Transcations } = require("./models");
const session = require("express-session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    name: "wallet_wizard",
    resave: false,
    saveUninitialized: true,
    secret: "this-is-very-secret",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, //for one day
    },
  })
);

//routes
app.get("/transcation-detail-info/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const transcationList = await Transcations.findAll({
      where: { user_id: userId },
      include: Category,
    });
    const expensesSum = await Transcations.sum("amount", {
      where: { user_id: userId },
      include: [
        {
          model: Category,
          where: { type: "expense" },
        },
      ],
      group: ["Category.id"],
    });
    const incomeSum = await Transcations.sum("amount", {
      where: { user_id: userId },
      include: [
        {
          model: Category,
          where: { type: "income" },
        },
      ],
      group: ["Category.id"],
    });
    const allCategory = await Category.findAll();
    const totalTranscations = await Transcations.count();
    res.json({
      transcationList,
      expensesSum,
      incomeSum,
      totalTranscations,
      allCategory,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/delete-transcation/:id/:userId", async (req, res) => {
  try {
    const transcationId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const transcation = await Transcations.findOne({ id: transcationId });
    const successful = await transcation.destroy();
    if (successful) {
      const newTranscationList = await Transcations.findAll({
        where: { user_id: userId },
        include: Category,
      });
      res.json({
        newTranscationList,
        success: "Data has successfully deleted",
      });
    } else {
      res.json({ error: "fail to delete" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/category", async (req, res) => {
  try {
    const allCategory = await Category.findAll();
    res.json({ allCategory });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login-data", async (req, res) => {
  try {
    const { email, password } = req.body.user;
    const user = await Customer.findOne({
      where: {
        email: email,
        password: password,
      },
    });
    if (user) {
      res.json({ error: null, userId: user.id });
    } else {
      res.json({ error: "Invaid information" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/signup-data", async (req, res) => {
  try {
    const { userName, email, password, currency } = req.body.user;
    const newUser = new Customer();
    newUser.user_name = userName;
    newUser.email = email;
    newUser.password = password;
    newUser.currency = currency;
    const successful = await newUser.save(newUser);
    if (successful) {
      res.json({ error: null });
    } else {
      res.json({ error: "fail to add data" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/add-transcation/:userId", async (req, res) => {
  try {
    const { title, note, dateOfTranscation, categoryId, amount } =
      req.body.transcation;
    const userId = parseInt(req.params.userId);
    const newTranscation = new Transcations();
    newTranscation.title = title;
    newTranscation.note = note;
    newTranscation.date_of_transacation = dateOfTranscation;
    newTranscation.category_id = parseInt(categoryId);
    newTranscation.user_id = userId;
    newTranscation.amount = parseInt(amount);
    const successful = await newTranscation.save(newTranscation);
    if (successful) {
      const newTranscationList = await Transcations.findAll({
        where: { user_id: userId },
        include: Category,
      });
      res.json({
        newTranscationList,
        success: "Data has successfully inserted",
      });
    } else {
      res.json({ error: "failed to add data" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(8005, () => {
  console.log("Server is starting on port 8005");
});
