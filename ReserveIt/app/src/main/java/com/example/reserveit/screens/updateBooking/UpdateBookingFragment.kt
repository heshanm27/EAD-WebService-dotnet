package com.example.reserveit.screens.updateBooking

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentReservationDetailsBinding
import com.example.reserveit.databinding.FragmentUpdateBookingBinding
import com.google.android.material.dialog.MaterialAlertDialogBuilder

class UpdateBookingFragment : Fragment() {

    private var binding : FragmentUpdateBookingBinding? = null

    private lateinit var viewModel: UpdateBookingViewModel

    override fun onResume() {
        super.onResume()
        (activity as MainActivity?)!!.hideBottomNavigationView()
    }
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentUpdateBookingBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()




        return binding?.root
    }



    override fun onDestroy() {
        super.onDestroy()
        (activity as MainActivity?)!!.showBottomNavigationView()
    }

}