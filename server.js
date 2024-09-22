const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//configurar conexion DB
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'wonderwonder1',
    database: 'tiendaLinea',
    port: 3306
});

//Conectar DB
connection.connect(error => {
    if (error) throw error;
    console.log("Conexion exitosa a la base de datos.");
});

//Crear endpoint para obtener los productos
app.get('/productos', (req, res) =>{
    connection.query('SELECT * FROM Productos', (eror,results) => {
        if (error) throw error;
        res.json(results);
    });
});


//ENDPOINT agregar prods
app.post('/productos', (req, res) =>{
    const nuevoProducto = req.body;
    const query = 'INSERT INTO Productos (nombre, descripcion, precio) VALUES (?,?,?)';
    connection.query(query, [nuevoProducto.nombre, nuevoProducto.descripcion, nuevoProducto.precio], (error,results) => {
        if(eror) throw error;
        res.status(201).send("Producto añadido");
    });
});

//ENDPOINT actaulizar producto 
app.put('/productos/:id', (req, res) => {
    const {id} = req.params;
    const {nombre, descripcion, precio} = req.body;
    const query = 'UPDATE Productos SET nombre = ?, descripcion =?, precio =? WHERE id=?';
    connection.query(query,[nombre, descripcion, precio, id],(error,results) =>{
        if(error) throw error;
        res.send("Producto actualizado con exito.");
    });
});
//ENDPOINT para eliminaar productos
app.delete('/productos/:id', (req,res)=> {
    const{id} = req.params;
    const query = 'DELETE FROM Productos WHERE id=?';
    connection.query(query,[id],(error, results) => {
        if(error) throw error;
        res.send("Producto eliminado con exito.");
    });
});
//iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
});