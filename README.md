# ConverterBackend, SOFTTECO Task
***
Backend for currency converter created in Express.JS

## Description
***
Created basic currency converter application backend.
Data are fetched using free banking API - ``NBP Web API``

## Endpoints
***
Endpoints allow the user to:
* get currency object by code: ``/getByCode`` using ``POST`` method
* get all currencies: ``/getAll`` using ``GET`` method
* add custom currency: ``/addCurrency`` using ``POST`` method
* update database: ``/updateDatabase`` using ``GET`` method
* recalculates value of all currencies according to the amount received: ``/recalculate`` using ``POST`` method

## Technologies used
***
To create backend, I used:
* git
* Express.js
* Mongoose
* NoSQL (MongoDB)