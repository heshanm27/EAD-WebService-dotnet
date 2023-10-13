package com.example.reserveit.models.reservation

/*
* File: Reservation.kt
* Author:
* Description: This model is used to store reservation information.
* */

data class Reservation(
    val id: String,
    val trainScheduleId: String,
    val userId: String,
    val seatNumber: String,
    val date: String,
    val totalPrice: String,
    val startStation: String,
    val endStation: String,
    val departTime: String,
    val arriveTime: String,
    val status: String
)
