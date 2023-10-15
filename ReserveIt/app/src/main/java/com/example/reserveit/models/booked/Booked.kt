package com.example.reserveit.models.booked

import android.os.Parcelable
import kotlinx.parcelize.Parcelize


data class Booked (
    val data: List<BookedData>,
    val status: Boolean,
    val message: String
)


@Parcelize
data class BookedData (
    val id: String,
    val reservedDate: String,
    val isActive: Boolean,
    val reservedSeatCount: Long,
    val ticket: BookedTicket,
    val reservationPrice: Long,
    val createdAt: String,
    val userResponse: UserResponse,
    val trainResponse: TrainResponse
) : Parcelable
@Parcelize
data class BookedTicket (
    val id: String,
    val ticketType: String,
    val ticketPrice: Long,
    val ticketCount: Long,
    val ticketBooked: Long
) : Parcelable
@Parcelize
data class TrainResponse (
    val id: String,
    val trainName: String,
    val trainNumber: String,
    val startStation: String,
    val endStation: String,
    val trainStartTime: String,
    val trainEndTime: String,
    val departureDate: String
) : Parcelable
@Parcelize
data class UserResponse (
    val id: String,
    val firstName: String,
    val lastName: String
) : Parcelable
