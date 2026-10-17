/* Independent official THK LME PDF snapshots. Pm normalized by fw. */
(function(root){const records=[
  {
    "id": "combined-MixAGa5",
    "name": "Theta · 복합 A · Ga=5",
    "source": "../verification/Theta_MixAGa5_LME.pdf",
    "inputs": {
      "mass": 12,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": -8,
      "Bt": 7,
      "Gr": 20,
      "Ga": 5,
      "Gt": -3,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -125.5,
          -197.8,
          -270.1
        ],
        "PT": [
          -62.4,
          -122.7,
          -182.9
        ]
      },
      {
        "PR": [
          125.5,
          197.8,
          270.1
        ],
        "PT": [
          -55.3,
          5.0,
          65.2
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        321.5833333333333,
        204.66666666666666
      ],
      "weightedPm": [
        385.9,
        245.6
      ],
      "L": [
        6550.0,
        25400.0
      ],
      "accelSafety": null,
      "safety": 8.4,
      "peak": 452.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 12,
      "Gr": 20,
      "Ga": 5,
      "Gt": -3,
      "Br": -8,
      "Bt": 7
    }
  },
  {
    "id": "combined-MixAGa6",
    "name": "Theta · 복합 A · Ga=6",
    "source": "../verification/Theta_MixAGa6_LME.pdf",
    "inputs": {
      "mass": 12,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": -8,
      "Bt": 7,
      "Gr": 20,
      "Ga": 6,
      "Gt": -3,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -125.5,
          -197.8,
          -270.1
        ],
        "PT": [
          -56.5,
          -116.8,
          -177.0
        ]
      },
      {
        "PR": [
          -270.1,
          -197.8,
          -125.5
        ],
        "PT": [
          -61.2,
          -1.0,
          59.3
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        315.6666666666667,
        200.75
      ],
      "weightedPm": [
        378.8,
        240.9
      ],
      "L": [
        6920.0,
        26900.0
      ],
      "accelSafety": null,
      "safety": 8.5,
      "peak": 447.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 12,
      "Gr": 20,
      "Ga": 6,
      "Gt": -3,
      "Br": -8,
      "Bt": 7
    }
  },
  {
    "id": "combined-MixBGa5",
    "name": "Theta · 복합 B · Ga=5",
    "source": "../verification/Theta_MixBGa5_LME.pdf",
    "inputs": {
      "mass": 22,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 16,
      "Bt": -4,
      "Gr": -6,
      "Ga": 5,
      "Gt": 2,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          407.1,
          296.6,
          186.2
        ],
        "PT": [
          -291.2,
          -224.9,
          -158.6
        ]
      },
      {
        "PR": [
          -407.1,
          -296.6,
          -186.2
        ],
        "PT": [
          75.4,
          9.1,
          -57.2
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        522.75,
        308.0833333333333
      ],
      "weightedPm": [
        627.3,
        369.7
      ],
      "L": [
        1520.0,
        7450.0
      ],
      "accelSafety": null,
      "safety": 5.4,
      "peak": 698.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 22,
      "Gr": -6,
      "Ga": 5,
      "Gt": 2,
      "Br": 16,
      "Bt": -4
    }
  },
  {
    "id": "combined-MixBGa6",
    "name": "Theta · 복합 B · Ga=6",
    "source": "../verification/Theta_MixBGa6_LME.pdf",
    "inputs": {
      "mass": 22,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 16,
      "Bt": -4,
      "Gr": -6,
      "Ga": 6,
      "Gt": 2,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          407.1,
          296.6,
          186.2
        ],
        "PT": [
          -280.3,
          -214.1,
          -147.8
        ]
      },
      {
        "PR": [
          186.2,
          296.6,
          407.1
        ],
        "PT": [
          64.6,
          -1.8,
          -68.0
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        512.0,
        300.75
      ],
      "weightedPm": [
        614.4,
        360.9
      ],
      "L": [
        1620.0,
        8000.0
      ],
      "accelSafety": null,
      "safety": 5.5,
      "peak": 687.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 22,
      "Gr": -6,
      "Ga": 6,
      "Gt": 2,
      "Br": 16,
      "Bt": -4
    }
  },
  {
    "id": "combined-MixCGa25",
    "name": "Theta · 복합 C · Ga=25",
    "source": "../verification/Theta_MixCGa25_LME.pdf",
    "inputs": {
      "mass": 9,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": -15,
      "Bt": -6,
      "Gr": 8,
      "Ga": 25,
      "Gt": 4,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -55.5,
          -23.9,
          7.8
        ],
        "PT": [
          -48.6,
          -3.4,
          41.9
        ]
      },
      {
        "PR": [
          7.8,
          -23.9,
          -55.5
        ],
        "PT": [
          -39.8,
          -84.9,
          -130.1
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        31.666666666666668,
        109.91666666666667
      ],
      "weightedPm": [
        38.0,
        131.9
      ],
      "L": [
        6860000.0,
        164000.0
      ],
      "accelSafety": null,
      "safety": 20.5,
      "peak": 185.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 9,
      "Gr": 8,
      "Ga": 25,
      "Gt": 4,
      "Br": -15,
      "Bt": -6
    }
  },
  {
    "id": "combined-MixCGa26",
    "name": "Theta · 복합 C · Ga=26",
    "source": "../verification/Theta_MixCGa26_LME.pdf",
    "inputs": {
      "mass": 9,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": -15,
      "Bt": -6,
      "Gr": 8,
      "Ga": 26,
      "Gt": 4,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -7.8,
          23.9,
          55.5
        ],
        "PT": [
          -44.2,
          1.1,
          46.3
        ]
      },
      {
        "PR": [
          7.8,
          -23.9,
          -55.5
        ],
        "PT": [
          -44.2,
          -89.4,
          -134.5
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        29.833333333333332,
        114.33333333333333
      ],
      "weightedPm": [
        35.8,
        137.2
      ],
      "L": [
        8260000.0,
        145000.0
      ],
      "accelSafety": null,
      "safety": 20.1,
      "peak": 189.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "mass": 9,
      "Gr": 8,
      "Ga": 26,
      "Gt": 4,
      "Br": -15,
      "Bt": -6
    }
  }
];if(typeof module!=="undefined"&&module.exports)module.exports=records;else root.LMCombinedExamples=records;})(typeof globalThis!=="undefined"?globalThis:this);
