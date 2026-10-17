/* THK official output snapshots; not a geometry-to-reaction solver. */
(function(root){const examples=[
  {
    "id": "theta-0",
    "name": "Theta · 기준 조건",
    "source": "../verification/Theta_THK_legacy_recalculated.pdf",
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
          -163.9,
          -190.3,
          -216.6
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          16.8,
          43.2,
          69.5
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          163.9,
          316.5,
          621.4
        ],
        [
          16.8,
          169.3,
          474.3
        ]
      ],
      "Pm": [
        322.8,
        180.6
      ],
      "L": [
        6480.0,
        37000.0
      ],
      "accelSafety": [
        9.4,
        9.4
      ]
    }
  },
  {
    "id": "theta-1",
    "name": "Theta · 가속도 5",
    "source": "../verification/Theta_A5.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.016,
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
          13.2,
          -126.2,
          -265.5
        ],
        "PT": [
          -177.1,
          -190.3,
          -203.4
        ]
      },
      {
        "PR": [
          -13.2,
          126.2,
          265.5
        ],
        "PT": [
          30.0,
          43.2,
          56.3
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          177.1,
          316.5,
          468.9
        ],
        [
          30.0,
          169.3,
          321.8
        ]
      ],
      "Pm": [
        319.6,
        175.0
      ],
      "L": [
        6670.0,
        40600.0
      ],
      "accelSafety": [
        14.3,
        14.3
      ]
    }
  },
  {
    "id": "theta-2",
    "name": "Theta · 가속도 2",
    "source": "../verification/Theta_A2.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.04,
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
          -70.5,
          -126.2,
          -181.9
        ],
        "PT": [
          -185.0,
          -190.3,
          -195.5
        ]
      },
      {
        "PR": [
          70.5,
          126.2,
          181.9
        ],
        "PT": [
          37.9,
          43.2,
          48.4
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          255.5,
          316.5,
          377.4
        ],
        [
          108.4,
          169.3,
          230.3
        ]
      ],
      "Pm": [
        317.7,
        171.7
      ],
      "L": [
        6790.0,
        43100.0
      ],
      "accelSafety": [
        14.9,
        21.0
      ]
    }
  },
  {
    "id": "theta-3",
    "name": "Theta · Br = 13",
    "source": "../verification/Theta_Br13.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 13,
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
          69.6,
          -126.2,
          -322.0
        ],
        "PT": [
          -163.9,
          -190.3,
          -216.6
        ]
      },
      {
        "PR": [
          -69.6,
          126.2,
          322.0
        ],
        "PT": [
          16.8,
          43.2,
          69.5
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          163.9,
          316.5,
          538.6
        ],
        [
          16.8,
          169.3,
          391.5
        ]
      ],
      "Pm": [
        319.9,
        175.4
      ],
      "L": [
        6650.0,
        40400.0
      ],
      "accelSafety": [
        11.8,
        11.8
      ]
    }
  },
  {
    "id": "theta-4",
    "name": "Theta · Bt = 0",
    "source": "../verification/Theta_Bt0.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": 0,
      "Gr": 13,
      "Ga": 0,
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
          -190.3,
          -190.3,
          -190.3
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          43.2,
          43.2,
          43.2
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          190.3,
          316.5,
          595.1
        ],
        [
          43.2,
          169.3,
          448.0
        ]
      ],
      "Pm": [
        321.8,
        178.8
      ],
      "L": [
        6530.0,
        38100.0
      ],
      "accelSafety": [
        9.4,
        9.4
      ]
    }
  },
  {
    "id": "theta-5",
    "name": "Theta · Br = −24",
    "source": "../verification/Theta_BrMinus24.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": -24,
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
          -209.1,
          -126.2,
          -43.4
        ],
        "PT": [
          -163.9,
          -190.3,
          -216.6
        ]
      },
      {
        "PR": [
          209.1,
          126.2,
          43.4
        ],
        "PT": [
          16.8,
          43.2,
          69.5
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          372.9,
          316.5,
          260.0
        ],
        [
          225.8,
          169.3,
          112.9
        ]
      ],
      "Pm": [
        316.7,
        169.7
      ],
      "L": [
        6860.0,
        44500.0
      ],
      "accelSafety": [
        10.2,
        16.9
      ]
    }
  },
  {
    "id": "theta-6",
    "name": "Theta · Bt = −3.5",
    "source": "../verification/Theta_BtMinus3p5.pdf",
    "inputs": {
      "mass": 15,
      "stroke": 30,
      "speed": 80,
      "time": 0.008,
      "fw": 1.2,
      "cycles": 600,
      "BS": 31.6,
      "Br": 24,
      "Bt": -3.5,
      "Gr": 13,
      "Ga": 0,
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
          -216.6,
          -190.3,
          -163.9
        ]
      },
      {
        "PR": [
          -152.5,
          126.2,
          404.8
        ],
        "PT": [
          69.5,
          43.2,
          16.8
        ]
      }
    ],
    "expected": {
      "PE": [
        [
          216.6,
          316.5,
          568.7
        ],
        [
          69.5,
          169.3,
          421.6
        ]
      ],
      "Pm": [
        321.0,
        177.1
      ],
      "L": [
        6580.0,
        39200.0
      ],
      "accelSafety": [
        9.4,
        9.4
      ]
    }
  }
]; if(typeof module!=="undefined"&&module.exports)module.exports=examples; else root.LMExamples=examples;})(typeof globalThis!=="undefined"?globalThis:this);
