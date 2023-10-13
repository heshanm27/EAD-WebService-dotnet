package com.example.reserveit.models.train_schedule


data class TrainScheduleModel (
    val data: List<TrainData>,
    val status: Boolean,
    val message: String
)

data class TrainData (
    val id: String,
    val trainName: String,
    val trainNumber: String,
    val startStation: String,
    val endStation: String,
    val trainStartTime: String,
    val trainEndTime: String,
    val departureDate: String,
    val tickets: List<Ticket?>,
    val reservations: List<Any?>,
    val isActive: Boolean,
    val isPublished: Boolean,
    val createdAt: String,
    val updatedAt: String
)

data class Ticket (
    val id: String,
    val ticketType: String,
    val ticketPrice: Long,
    val ticketCount: Long,
    val ticketBooked: Long
)
