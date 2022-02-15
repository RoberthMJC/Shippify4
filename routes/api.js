const express = require("express");
const router = express.Router();
const db = require("../db/database");
const isEmpty = require("lodash.isempty");

router.get("/vehicles", (req, res) => {
  let id = req.query.idDriver;
  db.query(
    "SELECT * FROM vehicle WHERE vehicle.driver_id=" + id,
    (err, vehicle) => {
      if (err) throw err;
      isEmpty(vehicle)
        ? res.json({
            msg: "No existen vehículos asociados al conductor ingresado",
          })
        : res.json(vehicle);
    }
  );
});

router.post("/createVehicle", (req, res) => {
  const body = req.body;
  const objVehicle = {
    driver_id: body.driver_id,
    plate: body.plate,
    model: body.model,
    type: body.type,
    capacity: body.capacity,
    creation_date: body.creation_date,
  };

  db.query("SELECT * FROM driver WHERE id=" + body.driver_id, (err, driver) => {
    if (isEmpty(driver)) {
      console.log("aqui");
      res.json({ status: "Error", message: "Conductor no encontrado." });
    } else {
      db.query(
        "SELECT * FROM vehicle WHERE plate=" + "'" + body.plate + "'",
        (err, vehicle) => {
          if (isEmpty(vehicle)) {
            db.query(
              "INSERT INTO vehicle SET ?",
              objVehicle,
              (error, insert) => {
                if (error) throw error;
                isEmpty(insert)
                  ? res.json({
                      msg: "No se pudo insertar el nuevo Vehículo.",
                    })
                  : res.json(body);
              }
            );
          } else {
            res.json({
              status: "Error",
              message: "Placa ya se encuentra registrada.",
            });
          }
        }
      );
    }
  });
});

router.post("/updateVehicle", (req, res) => {
  let id = req.query.idDriver;
  let sql = `UPDATE vehicle SET plate = ?, model = ?, type = ?, capacity = ?, creation_date = ? WHERE id = ?`;
  const body = req.body;
  let data = [
    body.plate,
    body.model,
    body.type,
    body.capacity,
    body.creation_date,
    req.query.id,
  ];
  db.query(sql, data, (err, vehicle) => {
    if (err) throw err;
    isEmpty(vehicle)
      ? res.json({
          status: "Error",
          message: "No se pudo actualizar el vehículo.",
        })
      : res.json(vehicle);
  });
});

router.delete("/deleteVehicle", (req, res) => {
  let id = req.query.id;
  db.query("DELETE FROM vehicle WHERE id = ?", id, (err, result) => {
    if (err) throw err;
    if (isEmpty(result)) {
      res.json({
        status: "Error",
        message: "Vehículo no encontrado.",
      });
    } else {
      res.json({
        status: "Ok",
        message: "Vehículo eliminado correctamente.",
      });
    }
  });
});

module.exports = router;
