package com.example.reserveit.screens.home

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.AutoCompleteTextView
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import com.example.reserveit.R
import com.example.reserveit.adapters.TrainScheduleAdapter
import com.example.reserveit.databinding.FragmentHomeBinding
import com.example.reserveit.repo.TrainScheduleRepo
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.datepicker.CalendarConstraints
import com.google.android.material.datepicker.CalendarConstraints.DateValidator
import com.google.android.material.datepicker.CompositeDateValidator
import com.google.android.material.datepicker.DateValidatorPointBackward
import com.google.android.material.datepicker.DateValidatorPointForward
import com.google.android.material.datepicker.MaterialDatePicker
import java.text.SimpleDateFormat
import java.time.LocalDate
import java.util.Calendar
import java.util.TimeZone

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
        val trainScheduleRepo = TrainScheduleRepo()
        viewModel = HomeViewModel(trainScheduleRepo)

        val bottomSheet = binding!!.standardBottomSheet
        val standardBottomSheetBehavior = BottomSheetBehavior.from(bottomSheet)


        //get the height of the screen and set the peek height of the bottom sheet to 30% of the screen height
        val displayMetrics = requireContext().resources.displayMetrics
        val dpHeight = displayMetrics.heightPixels
        val peekHeightRatio = 0.3
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

        binding!!.startStation.addTextChangedListener(object : android.text.TextWatcher {
            override fun afterTextChanged(s: android.text.Editable?) {
                performSearchIfAllFieldsFilled()
            }

            override fun beforeTextChanged(
                s: CharSequence?,
                start: Int,
                count: Int,
                after: Int
            ) {
                Log.d("HomeFragment", "startStation beforeTextChanged: $s")
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                Log.d("HomeFragment", "startStation onTextChanged: $s")
            }
        })

        binding!!.endStation.addTextChangedListener(object : android.text.TextWatcher {
            override fun afterTextChanged(s: android.text.Editable?) {
                performSearchIfAllFieldsFilled()
            }

            override fun beforeTextChanged(
                s: CharSequence?,
                start: Int,
                count: Int,
                after: Int
            ) {
                Log.d("HomeFragment", "endStation beforeTextChanged: $s")
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                Log.d("HomeFragment", "endStation onTextChanged: $s")
            }
        })


        binding!!.datePicker.addTextChangedListener(object : android.text.TextWatcher {
            override fun afterTextChanged(s: android.text.Editable?) {
                performSearchIfAllFieldsFilled()
            }

            override fun beforeTextChanged(
                s: CharSequence?,
                start: Int,
                count: Int,
                after: Int
            ) {
                Log.d("HomeFragment", "endStation beforeTextChanged: $s")
            }

            override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
                Log.d("HomeFragment", "endStation onTextChanged: $s")
            }
        })


    viewModel.trainScheduleList.observe(viewLifecycleOwner, Observer { trainScheduleList ->
        Log.d("HomeFragment", "trainScheduleList: $trainScheduleList")
        if(trainScheduleList.isEmpty()) {
            binding!!.bottomSheetNoReservationsLayout.visibility = View.VISIBLE
            binding!!.bottomSheetReservationsRecyclerView.visibility = View.GONE
        } else {
            binding!!.bottomSheetNoReservationsLayout.visibility = View.VISIBLE
            binding!!.bottomSheetReservationsRecyclerView.visibility = View.VISIBLE
        }

        val adapter = TrainScheduleAdapter(trainScheduleList)
        recyclerView.adapter = adapter
    })

    viewModel.isLoading.observe(viewLifecycleOwner, Observer { isLoading ->

        if(isLoading) {
            binding!!.bottomSheetNoReservationsTextView.visibility = View.GONE
            binding!!.lottieNoReservationsAnimationView.visibility = View.GONE
            binding!!.lottieSearchAnimationView.visibility = View.VISIBLE
        } else {
            binding!!.lottieSearchAnimationView.visibility = View.GONE
            if(viewModel.trainScheduleList.value!!.isEmpty()) {
                binding!!.bottomSheetNoReservationsTextView.visibility = View.VISIBLE
                binding!!.lottieNoReservationsAnimationView.visibility = View.VISIBLE
            }
        }
    })
        // Observe the train schedule list
//        viewModel.trainScheduleList.observe(viewLifecycleOwner, Observer { trainScheduleList ->
//            // Update UI with the new train schedule list
//            // trainScheduleList contains the latest data from the ViewModel
//        })

//        val list = viewModel.trainScheduleList
//        val adapter = TrainScheduleAdapter(list)
//        recyclerView.adapter = adapter


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
            val utc = Calendar.getInstance(TimeZone.getTimeZone("UTC"));
            utc.timeInMillis = selection;

            val format = SimpleDateFormat("yyyy MM dd")
            val formattedDate = format.format(utc.time)

            Log.d("HomeFragment", "showDatePicker: ${formattedDate}")
            datePickerView!!.setText(formattedDate)
        }

//        datePickerView!!.setText(datePicker.headerText)
    }


    private  fun performSearchIfAllFieldsFilled() {
        val startStation = binding!!.startStation.text.toString()
        val endStation = binding!!.endStation.text.toString()
        val date = binding!!.datePicker.text.toString()



//        Log.d("HomeFragment", "startStation: ${date.getMonth()}")
////
//        Log.d("HomeFragment", "startStation: $startStation")
//        Log.d("HomeFragment", "endStation: $endStation")
//        Log.d("HomeFragment", "date: ${CommonUtil.formatDateToDesiredFormat(date)})}")

        if (startStation.isNotEmpty() && endStation.isNotEmpty() && date.isNotEmpty()) {
//            Log.d("HomeFragment", "Performing search: $startStation $endStation $date")
            viewModel.getTrainSchedule(1, 10, "asc", endStation, startStation, date)
        }
    }

}