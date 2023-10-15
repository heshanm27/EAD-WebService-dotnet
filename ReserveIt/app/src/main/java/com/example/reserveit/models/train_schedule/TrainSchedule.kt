package com.example.reserveit.models.train_schedule

import android.os.Parcelable
import kotlinx.parcelize.Parcelize
import kotlinx.parcelize.RawValue


data class TrainScheduleModel (
    val data: List<TrainData>,
    val status: Boolean,
    val message: String
)

data class TrainScheduleModelOne (
    val data: TrainData,
    val status: Boolean,
    val message: String
)

@Parcelize
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
    val reservations: List<String?>,
    val isActive: Boolean,
    val isPublished: Boolean,
):Parcelable

@Parcelize
data class Ticket (
    val id: String,
    val ticketType: String,
    val ticketPrice: Long,
    val ticketCount: Long,
    val ticketBooked: Long
):Parcelable
