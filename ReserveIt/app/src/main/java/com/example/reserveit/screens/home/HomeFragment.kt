package com.example.reserveit.screens.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.fragment.app.Fragment
import com.example.reserveit.R
import com.example.reserveit.adapters.TrainScheduleAdapter
import com.example.reserveit.databinding.FragmentHomeBinding
import com.example.reserveit.models.train_schedule.TrainSchedule
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.datepicker.*
import com.google.android.material.datepicker.CalendarConstraints.DateValidator
import java.util.*

/*
* File: HomeFragment.kt
* Author:
* Description: This class is used to display Home Screen.
* */

class HomeFragment : Fragment() {
    private var binding: FragmentHomeBinding? = null
    private val _binding get() = binding!!
    private lateinit var viewModel: HomeViewModel
    private lateinit var datePickerView: AutoCompleteTextView


    override fun onResume() {
        super.onResume()
        val station = resources.getStringArray(R.array.station_arr)
        val arradapter = context?.let { ArrayAdapter(it, R.layout.dropdown_item, station) }
        binding!!.startStation.setAdapter(arradapter)
        binding!!.endStation.setAdapter(arradapter)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragmentHomeBinding.inflate(inflater, container, false)

        viewModel = HomeViewModel()

        val bottomSheet = binding!!.standardBottomSheet
        val standardBottomSheetBehavior = BottomSheetBehavior.from(bottomSheet)

        val displayMetrics = context!!.resources.displayMetrics
        val dpHeight = displayMetrics.heightPixels

        Log.d("dpHeight", dpHeight.toString())
        Log.d("dpHeight", displayMetrics.widthPixels.toString())

        val peekHeightRatio = 0.3 // Set the ratio as needed (0.5 means the peek height is half of the screen height)
        val peekHeight = (dpHeight * peekHeightRatio).toInt()

        standardBottomSheetBehavior.peekHeight = peekHeight
        standardBottomSheetBehavior.isHideable = false


        datePickerView = binding!!.datePicker
        datePickerView.setOnClickListener {
            showDatePicker()
        }
        val recyclerView = binding!!.bottomSheetReservationsRecyclerView
        recyclerView.setHasFixedSize(true)
        recyclerView.layoutManager = androidx.recyclerview.widget.LinearLayoutManager(context)
        viewModel.addReservation(TrainSchedule("start", "end", "depart", "arrive", "price"))

        val list = viewModel.trainScheduleList
        val adapter = TrainScheduleAdapter(list)
        recyclerView.adapter = adapter


        return binding?.root
    }

    private fun showDatePicker() {
        val today = MaterialDatePicker.todayInUtcMilliseconds()
        val calendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))

        calendar.add(Calendar.MONTH, 1)

        // Set the minimum and maximum dates of the date picker.
        val constraintsBuilder =
            CalendarConstraints.Builder()
                .setStart(today)
                .setEnd(calendar.timeInMillis)
                .setValidator(
                CompositeDateValidator.allOf(
                    listOf<DateValidator>(
                    DateValidatorPointForward.from(today),
                    DateValidatorPointBackward.before(calendar.timeInMillis))
                ))
                .setOpenAt(today)
                .build()
        val datePicker =
            MaterialDatePicker.Builder.datePicker()
                .setTitleText("Select date")
                .setCalendarConstraints(constraintsBuilder)
                .build()

        datePicker.show(childFragmentManager, "datePicker")
        datePicker.addOnPositiveButtonClickListener { selection ->
            Log.d("HomeFragment", "datePickerLayout clicked ${datePicker.headerText}")
            datePickerView!!.setText(datePicker.headerText)
        }

//        datePickerView!!.setText(datePicker.headerText)
    }


}