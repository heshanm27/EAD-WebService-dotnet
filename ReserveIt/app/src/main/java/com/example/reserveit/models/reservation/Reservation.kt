package com.example.reserveit.models.reservation

data class Reservation(
    val startStation: String,
    val endStation: String,
    val departTime: String,
    val arriveTime: String,
    val price: String
)
