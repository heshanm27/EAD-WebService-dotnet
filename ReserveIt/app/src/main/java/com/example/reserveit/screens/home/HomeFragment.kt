package com.example.reserveit.screens.home

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.constraintlayout.widget.ConstraintLayout
import com.example.reserveit.R
import com.example.reserveit.databinding.FragmentHomeBinding
import com.google.android.material.bottomsheet.BottomSheetBehavior


class HomeFragment : Fragment() {
    private var binding : FragmentHomeBinding? = null
    private val _binding get() = binding!!

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
        binding  = FragmentHomeBinding.inflate(inflater, container, false)

        val bottomSheet = binding!!.standardBottomSheet as ConstraintLayout
        val standardBottomSheetBehavior = BottomSheetBehavior.from(bottomSheet)
        standardBottomSheetBehavior.peekHeight = 900
        standardBottomSheetBehavior.isHideable = false

       


        return binding?.root
    }


}