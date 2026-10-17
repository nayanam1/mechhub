/* Independent official THK LME PDF snapshots. Pm normalized by fw. */
(function(root){const records=[
  {
    "id": "extended-Mass30",
    "name": "Theta · 질량 30 kg",
    "source": "../verification/Theta_Mass30_LME.pdf",
    "inputs": {
      "mass": 30,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 0,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          304.9,
          -252.4,
          -809.6
        ],
        "PT": [
          -327.8,
          -380.5,
          -433.2
        ]
      },
      {
        "PR": [
          -304.9,
          252.4,
          809.6
        ],
        "PT": [
          33.6,
          86.3,
          139.0
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        645.4166666666667,
        361.1666666666667
      ],
      "weightedPm": [
        774.5,
        433.4
      ],
      "L": [
        810.0,
        4620.0
      ],
      "accelSafety": null,
      "safety": 3.0,
      "peak": 1.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 30
    }
  },
  {
    "id": "extended-Mass7p5",
    "name": "Theta · 질량 7.5 kg",
    "source": "../verification/Theta_Mass7p5_LME.pdf",
    "inputs": {
      "mass": 7.5,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 0,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          76.3,
          -63.1,
          -202.4
        ],
        "PT": [
          -82.0,
          -95.2,
          -108.3
        ]
      },
      {
        "PR": [
          -76.3,
          63.1,
          202.4
        ],
        "PT": [
          8.4,
          21.6,
          34.8
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        161.41666666666666,
        90.33333333333334
      ],
      "weightedPm": [
        193.7,
        108.4
      ],
      "L": [
        51800.0,
        296000.0
      ],
      "accelSafety": null,
      "safety": 12.2,
      "peak": 310.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 7.5
    }
  },
  {
    "id": "extended-Gr0",
    "name": "Theta · Gr = 0",
    "source": "../verification/Theta_Gr0_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 0,
      "Ga": 0,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          279.3,
          98.6,
          -82.2
        ],
        "PT": [
          -163.9,
          -190.3,
          -216.6
        ]
      },
      {
        "PR": [
          -279.3,
          -98.6,
          82.2
        ],
        "PT": [
          16.8,
          43.2,
          69.5
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        290.83333333333337,
        145.25000000000003
      ],
      "weightedPm": [
        349.0,
        174.3
      ],
      "L": [
        8850.0,
        71100.0
      ],
      "accelSafety": null,
      "safety": 8.6,
      "peak": 443.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Gr": 0
    }
  },
  {
    "id": "extended-GrMinus13",
    "name": "Theta · Gr = −13",
    "source": "../verification/Theta_GrMinus13_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": -13,
      "Ga": 0,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          406.1,
          323.3,
          240.4
        ],
        "PT": [
          -163.9,
          -190.3,
          -216.6
        ]
      },
      {
        "PR": [
          -406.1,
          -323.3,
          -240.4
        ],
        "PT": [
          16.8,
          43.2,
          69.5
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        513.5833333333334,
        366.5833333333333
      ],
      "weightedPm": [
        616.3,
        439.9
      ],
      "L": [
        1600.0,
        4420.0
      ],
      "accelSafety": null,
      "safety": 6.7,
      "peak": 569.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Gr": -13
    }
  },
  {
    "id": "extended-GaPlus10",
    "name": "Theta · Ga = +10",
    "source": "../verification/Theta_GaPlus10_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 10,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -90.1,
          -116.4,
          -142.8
        ]
      },
      {
        "PR": [
          -404.8,
          -126.2,
          152.5
        ],
        "PT": [
          -57.1,
          -30.8,
          -4.4
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        250.58333333333334,
        169.08333333333334
      ],
      "weightedPm": [
        300.7,
        202.9
      ],
      "L": [
        13800.0,
        45000.0
      ],
      "accelSafety": null,
      "safety": 6.9,
      "peak": 547.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Ga": 10
    }
  },
  {
    "id": "extended-GaMinus10",
    "name": "Theta · Ga = −10",
    "source": "../verification/Theta_GaMinus10_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": -10,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -237.8,
          -264.1,
          -290.5
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          90.7,
          117.0,
          143.4
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        395.5833333333333,
        251.16666666666666
      ],
      "weightedPm": [
        474.7,
        301.4
      ],
      "L": [
        3510.0,
        13700.0
      ],
      "accelSafety": null,
      "safety": 5.4,
      "peak": 695.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Ga": -10
    }
  },
  {
    "id": "extended-GtPlus5",
    "name": "Theta · Gt = +5",
    "source": "../verification/Theta_GtPlus5_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 0,
      "Gt": 5,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -201.6,
          -190.3,
          -179.0
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          54.5,
          43.2,
          31.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        321.5,
        178.0
      ],
      "weightedPm": [
        385.8,
        213.6
      ],
      "L": [
        6560.0,
        38600.0
      ],
      "accelSafety": null,
      "safety": 6.5,
      "peak": 583.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Gt": 5
    }
  },
  {
    "id": "extended-GtMinus5",
    "name": "Theta · Gt = −5",
    "source": "../verification/Theta_GtMinus5_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 0,
      "Gt": -5,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -126.3,
          -190.3,
          -254.3
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          -20.9,
          43.2,
          107.2
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        324.25000000000006,
        183.58333333333334
      ],
      "weightedPm": [
        389.1,
        220.3
      ],
      "L": [
        6390.0,
        35200.0
      ],
      "accelSafety": null,
      "safety": 5.7,
      "peak": 659.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Gt": -5
    }
  },
  {
    "id": "extended-GaPlus5",
    "name": "Theta · Ga = +5",
    "source": "../verification/Theta_GaPlus5_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 5,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -127.0,
          -153.3,
          -179.7
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          -20.2,
          6.2,
          32.6
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        286.5,
        146.83333333333334
      ],
      "weightedPm": [
        343.8,
        176.2
      ],
      "L": [
        9260.0,
        68800.0
      ],
      "accelSafety": null,
      "safety": 6.5,
      "peak": 584.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Ga": 5
    }
  },
  {
    "id": "extended-GaPlus6",
    "name": "Theta · Ga = +6",
    "source": "../verification/Theta_GaPlus6_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 6,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          152.5,
          -126.2,
          -404.8
        ],
        "PT": [
          -119.6,
          -146.0,
          -172.3
        ]
      },
      {
        "PR": [
          -404.8,
          -126.2,
          152.5
        ],
        "PT": [
          -27.6,
          -1.2,
          25.2
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        279.3333333333333,
        142.33333333333334
      ],
      "weightedPm": [
        335.2,
        170.8
      ],
      "L": [
        10000.0,
        75500.0
      ],
      "accelSafety": null,
      "safety": 6.6,
      "peak": 577.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "Ga": 6
    }
  }
];if(typeof module!=="undefined"&&module.exports)module.exports=records;else root.LMExtendedExamples=records;})(typeof globalThis!=="undefined"?globalThis:this);
