package com.example.reserveit.screens.bookedDetails

import android.annotation.SuppressLint
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs
import com.example.reserveit.MainActivity
import com.example.reserveit.databinding.FragmentBookedDetailsBinding
import com.example.reserveit.screens.trainScheduleDetails.TrainScheduleDetailsFragmentArgs
import com.google.android.material.dialog.MaterialAlertDialogBuilder

/*
* File: BookedDetailsFragment.kt
* Author:
* Description: This class is used to display all bookings.
* */

class BookedDetailsFragment : Fragment() {


    private var binding : FragmentBookedDetailsBinding? = null
    private lateinit var viewModel: BookedDetailsViewModel
    val args : BookedDetailsFragmentArgs by navArgs()
    @SuppressLint("SetTextI18n")
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBookedDetailsBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()



        binding!!.topAppBar.setNavigationOnClickListener {
            findNavController().popBackStack()
        }

        Log.d("BookedDetailsFragment", "onCreateView: ${args.bookedDetails}")


        binding!!.startEndStation.text = args.bookedDetails.trainResponse.startStation + " - " + args.bookedDetails.trainResponse.endStation
        binding!!.trainDetails.text = args.bookedDetails.trainResponse.trainName + " - " + args.bookedDetails.trainResponse.trainNumber
        binding!!.trainDepartureDate.text = args.bookedDetails.trainResponse.trainStartTime
        binding!!.arrivalTime.text = args.bookedDetails.trainResponse.trainStartTime
        binding!!.dropTime.text = args.bookedDetails.trainResponse.trainEndTime
        binding!!.trainDepartureDate.text = args.bookedDetails.trainResponse.departureDate



        binding?.bookCancelAction?.setOnClickListener {
            context?.let {
                MaterialAlertDialogBuilder(it)
                    .setTitle("Cancel Reservation")
                    .setMessage("Are you sure you want to cancel this reservation?")
                    .setMessage("Cancel Reservation can not be undone")
                    .setNeutralButton("Cancel") { dialog, which ->
                        dialog.dismiss()
                    }
                    .setPositiveButton("Continue") { dialog, which ->
                        // Respond to positive button press

                        dialog.dismiss()
                        findNavController().popBackStack()
                    }
                    .show()
        }}

        return binding?.root
    }

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
    }

    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }


}