package com.example.reserveit.models.train_schedule

data class TrainSchedule(
    val startStation: String,
    val endStation: String,
    val departTime: String,
    val arriveTime: String,
    val price: String
)
