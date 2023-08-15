const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");
const {check, validationResult} = require("express-validator");


//TODO: Create your GET Request Route Below:

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const allRestaurants = await Restaurant.findAll();
  res.json(allRestaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const singleRestaurant = await Restaurant.findByPk(req.params.id);
  res.json(singleRestaurant);
});

app.post("/restaurants", [check("name").not().isEmpty().trim(), check("location").not().isEmpty().trim(), check("cuisine").not().isEmpty().trim()], async (req, res) => {
  const result = validationResult(req);
  if(result.isEmpty()){
    const newRestaurant = await Restaurant.create(req.body);
    res.json(newRestaurant);

  }else{
    res.json({error:result.array()})
  }
});

app.put("/restaurants/:id", async (req, res) => {
  const foundRestaurant = await Restaurant.findByPk(req.params.id);
  await foundRestaurant.update(req.body);
  res.json(foundRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const foundRestaurant = await Restaurant.findByPk(req.params.id);
  await foundRestaurant.destroy();
  res.json(foundRestaurant);
});

module.exports = app;
