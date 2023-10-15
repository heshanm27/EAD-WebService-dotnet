package com.example.reserveit.utill


import android.util.Log
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.format.DateTimeParseException


object CommonUtil {


    fun formatDateToDesiredFormat(date: String): String {
        try {
            // Parse the input date string
            val parsedDate = LocalDate.parse(date)

            // Format the parsed date to "yyyy-MM-dd" format
            val outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")
            return parsedDate.format(outputFormatter)
        } catch (e: DateTimeParseException) {
            Log.d("HomeFragment", "formatDateToDesiredFormat: ${e.message}")
            // Handle the case where the input date string is not in the expected format
            // You can throw an exception or return an error message, depending on your use case
            return "Invalid Date Format"
        }
    }
}