package com.example.reserveit.screens.bookedDetails

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.databinding.FragmentBookedDetailsBinding
import com.google.android.material.dialog.MaterialAlertDialogBuilder

/*
* File: BookedDetailsFragment.kt
* Author:
* Description: This class is used to display all bookings.
* */

class BookedDetailsFragment : Fragment() {


    private var binding : FragmentBookedDetailsBinding? = null
    private lateinit var viewModel: BookedDetailsViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBookedDetailsBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()

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