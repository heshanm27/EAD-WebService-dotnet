package com.example.reserveit.models.reservation

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
