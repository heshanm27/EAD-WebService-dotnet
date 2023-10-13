package com.example.reserveit.models.train_schedule

/*
* File: TrainSchedule.kt
* Author:
* Description: This class is used to store train Schedule information.
* */

data class TrainSchedule(
    val startStation: String,
    val endStation: String,
    val departTime: String,
    val arriveTime: String,
    val price: String
)
