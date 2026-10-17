/* Independent official THK LME PDF snapshots. Pm normalized by fw. */
(function(root){const records=[
  {
    "id": "span-BS40",
    "name": "Theta · BS = 40",
    "source": "../verification/Theta_BS40_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 40,
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
          34.9,
          -126.2,
          -287.2
        ],
        "PT": [
          -143.7,
          -158.9,
          -174.2
        ]
      },
      {
        "PR": [
          -34.9,
          126.2,
          287.2
        ],
        "PT": [
          -3.5,
          11.8,
          27.1
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        287.5,
        142.66666666666666
      ],
      "weightedPm": [
        345.0,
        171.2
      ],
      "L": [
        9170.0,
        75000.0
      ],
      "accelSafety": null,
      "safety": 8.2,
      "peak": 461.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 40
    }
  },
  {
    "id": "span-BS60",
    "name": "Theta · BS = 60",
    "source": "../verification/Theta_BS60_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 60,
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
          -33.7,
          -126.2,
          -218.8
        ],
        "PT": [
          -138.4,
          -147.2,
          -155.9
        ]
      },
      {
        "PR": [
          33.7,
          126.2,
          218.8
        ],
        "PT": [
          -8.7,
          0.1,
          8.8
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        274.1666666666667,
        128.0
      ],
      "weightedPm": [
        329.0,
        153.6
      ],
      "L": [
        10500.0,
        104000.0
      ],
      "accelSafety": null,
      "safety": 10.1,
      "peak": 374.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 60
    }
  },
  {
    "id": "span-BS100",
    "name": "Theta · BS = 100",
    "source": "../verification/Theta_BS100_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 100,
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
          -70.7,
          -126.2,
          -181.7
        ],
        "PT": [
          -141.9,
          -147.1,
          -152.4
        ]
      },
      {
        "PR": [
          70.7,
          126.2,
          181.7
        ],
        "PT": [
          -5.3,
          0.0,
          5.3
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        273.58333333333337,
        126.83333333333333
      ],
      "weightedPm": [
        328.3,
        152.2
      ],
      "L": [
        10600.0,
        106000.0
      ],
      "accelSafety": null,
      "safety": 11.4,
      "peak": 334.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100
    }
  },
  {
    "id": "span-BS40Ga2",
    "name": "Theta · BS=40 · Ga=2",
    "source": "../verification/Theta_BS40Ga2_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 40,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 2,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          34.9,
          -126.2,
          -287.2
        ],
        "PT": [
          -135.2,
          -150.4,
          -165.6
        ]
      },
      {
        "PR": [
          -34.9,
          126.2,
          287.2
        ],
        "PT": [
          -12.0,
          3.3,
          18.5
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        279.0,
        134.41666666666669
      ],
      "weightedPm": [
        334.8,
        161.3
      ],
      "L": [
        10000.0,
        89700.0
      ],
      "accelSafety": null,
      "safety": 8.4,
      "peak": 452.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 40,
      "Ga": 2
    }
  },
  {
    "id": "span-BS40Ga3",
    "name": "Theta · BS=40 · Ga=3",
    "source": "../verification/Theta_BS40Ga3_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 40,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 3,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          34.9,
          -126.2,
          -287.2
        ],
        "PT": [
          -130.9,
          -146.1,
          -161.4
        ]
      },
      {
        "PR": [
          -287.2,
          -126.2,
          34.9
        ],
        "PT": [
          -16.3,
          -1.0,
          14.3
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        274.75,
        132.25
      ],
      "weightedPm": [
        329.7,
        158.7
      ],
      "L": [
        10500.0,
        94200.0
      ],
      "accelSafety": null,
      "safety": 8.5,
      "peak": 448.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 40,
      "Ga": 3
    }
  },
  {
    "id": "span-BS40Ga37",
    "name": "Theta · BS=40 · Ga=37",
    "source": "../verification/Theta_BS40Ga37_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 40,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 37,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          34.9,
          -126.2,
          -287.2
        ],
        "PT": [
          14.3,
          -1.0,
          -16.3
        ]
      },
      {
        "PR": [
          -287.2,
          -126.2,
          34.9
        ],
        "PT": [
          -161.4,
          -146.1,
          -130.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        132.25,
        274.75
      ],
      "weightedPm": [
        158.7,
        329.7
      ],
      "L": [
        94200.0,
        10500.0
      ],
      "accelSafety": null,
      "safety": 8.5,
      "peak": 448.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 40,
      "Ga": 37
    }
  },
  {
    "id": "span-BS40Ga38",
    "name": "Theta · BS=40 · Ga=38",
    "source": "../verification/Theta_BS40Ga38_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 40,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 38,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          287.2,
          126.2,
          -34.9
        ],
        "PT": [
          18.5,
          3.3,
          -12.0
        ]
      },
      {
        "PR": [
          -287.2,
          -126.2,
          34.9
        ],
        "PT": [
          -165.6,
          -150.4,
          -135.2
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        134.41666666666669,
        279.0
      ],
      "weightedPm": [
        161.3,
        334.8
      ],
      "L": [
        89700.0,
        10000.0
      ],
      "accelSafety": null,
      "safety": 8.4,
      "peak": 452.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 40,
      "Ga": 38
    }
  },
  {
    "id": "span-BS60GaMinus1",
    "name": "Theta · BS=60 · Ga=-1",
    "source": "../verification/Theta_BS60GaMinus1_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 60,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": -1,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -33.7,
          -126.2,
          -218.8
        ],
        "PT": [
          -140.9,
          -149.6,
          -158.4
        ]
      },
      {
        "PR": [
          33.7,
          126.2,
          218.8
        ],
        "PT": [
          -6.3,
          2.5,
          11.3
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        276.5833333333333,
        130.41666666666669
      ],
      "weightedPm": [
        331.9,
        156.5
      ],
      "L": [
        10200.0,
        98300.0
      ],
      "accelSafety": null,
      "safety": 10.1,
      "peak": 377.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 60,
      "Ga": -1
    }
  },
  {
    "id": "span-BS60Ga1",
    "name": "Theta · BS=60 · Ga=1",
    "source": "../verification/Theta_BS60Ga1_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 60,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 1,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -33.7,
          -126.2,
          -218.8
        ],
        "PT": [
          -136.0,
          -144.7,
          -153.5
        ]
      },
      {
        "PR": [
          -218.8,
          -126.2,
          -33.7
        ],
        "PT": [
          -11.2,
          -2.4,
          6.4
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        271.75000000000006,
        130.33333333333334
      ],
      "weightedPm": [
        326.1,
        156.4
      ],
      "L": [
        10800.0,
        98500.0
      ],
      "accelSafety": null,
      "safety": 10.2,
      "peak": 372.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 60,
      "Ga": 1
    }
  },
  {
    "id": "span-BS100GaMinus1",
    "name": "Theta · BS=100 · Ga=-1",
    "source": "../verification/Theta_BS100GaMinus1_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 100,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": -1,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -70.7,
          -126.2,
          -181.7
        ],
        "PT": [
          -143.4,
          -148.6,
          -153.9
        ]
      },
      {
        "PR": [
          70.7,
          126.2,
          181.7
        ],
        "PT": [
          -3.8,
          1.5,
          6.8
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        275.08333333333337,
        128.33333333333334
      ],
      "weightedPm": [
        330.1,
        154.0
      ],
      "L": [
        10400.0,
        103000.0
      ],
      "accelSafety": null,
      "safety": 11.3,
      "peak": 335.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": -1
    }
  },
  {
    "id": "span-BS100Ga1",
    "name": "Theta · BS=100 · Ga=1",
    "source": "../verification/Theta_BS100Ga1_LME.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 100,
      "Br": 24,
      "Bt": 3.5,
      "Gr": 13,
      "Ga": 1,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          -70.7,
          -126.2,
          -181.7
        ],
        "PT": [
          -140.4,
          -145.7,
          -150.9
        ]
      },
      {
        "PR": [
          -181.7,
          -126.2,
          -70.7
        ],
        "PT": [
          -6.8,
          -1.5,
          3.8
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        272.1666666666667,
        128.33333333333334
      ],
      "weightedPm": [
        326.6,
        154.0
      ],
      "L": [
        10800.0,
        103000.0
      ],
      "accelSafety": null,
      "safety": 11.4,
      "peak": 332.0
    },
    "sourceNote": "THK LME 2026-10-15; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 1
    }
  }
];if(typeof module!=="undefined"&&module.exports)module.exports=records;else root.LMSpanExamples=records;})(typeof globalThis!=="undefined"?globalThis:this);
