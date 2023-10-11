package com.example.reserveit.screens.bookedDetails

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.reserveit.MainActivity
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentBookedDetailsBinding
import com.example.reserveit.databinding.FragmentReservationDetailsBinding

class BookedDetailsFragment : Fragment() {


    private var binding : FragmentBookedDetailsBinding? = null
    private lateinit var viewModel: BookedDetailsViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBookedDetailsBinding.inflate(inflater, container, false)
        (activity as MainActivity?)!!.hideBottomNavigationView()

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