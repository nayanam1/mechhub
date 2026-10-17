/* Independent official THK LME PDF snapshots. Pm normalized by fw. */
(function(root){const records=[
  {
    "id": "gr-GrBoundary1",
    "name": "Theta · BS100 Ga100 Gr1",
    "source": "../verification/Theta_GrBoundary1_LME.pdf",
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
      "Gr": 1.0,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          118.8,
          81.3,
          43.8
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          43.8,
          81.3,
          118.8
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        81.66666666666667,
        228.5
      ],
      "weightedPm": [
        98.0,
        274.2
      ],
      "L": [
        400000.0,
        18200.0
      ],
      "accelSafety": null,
      "safety": 14.6,
      "peak": 260.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 1.0
    }
  },
  {
    "id": "gr-GrBoundary2",
    "name": "Theta · BS100 Ga100 Gr2",
    "source": "../verification/Theta_GrBoundary2_LME.pdf",
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
      "Gr": 2.0,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          103.0,
          64.0,
          25.0
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          25.0,
          64.0,
          103.0
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        64.50000000000001,
        211.16666666666669
      ],
      "weightedPm": [
        77.4,
        253.4
      ],
      "L": [
        813000.0,
        23100.0
      ],
      "accelSafety": null,
      "safety": 15.6,
      "peak": 244.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 2.0
    }
  },
  {
    "id": "gr-GrBoundary3",
    "name": "Theta · BS100 Ga100 Gr3",
    "source": "../verification/Theta_GrBoundary3_LME.pdf",
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
      "Gr": 3.0,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          87.2,
          46.7,
          6.2
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          6.2,
          46.7,
          87.2
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        47.416666666666664,
        193.91666666666666
      ],
      "weightedPm": [
        56.9,
        232.7
      ],
      "L": [
        2040000.0,
        29800.0
      ],
      "accelSafety": null,
      "safety": 16.6,
      "peak": 229.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 3.0
    }
  },
  {
    "id": "gr-GrBoundary4",
    "name": "Theta · BS100 Ga100 Gr4",
    "source": "../verification/Theta_GrBoundary4_LME.pdf",
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
      "Gr": 4.0,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          71.4,
          29.4,
          -12.7
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -12.7,
          29.4,
          71.4
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        30.666666666666664,
        176.75
      ],
      "weightedPm": [
        36.8,
        212.1
      ],
      "L": [
        7580000.0,
        39400.0
      ],
      "accelSafety": null,
      "safety": 17.9,
      "peak": 213.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 4.0
    }
  },
  {
    "id": "gr-GrBoundary5",
    "name": "Theta · BS100 Ga100 Gr5",
    "source": "../verification/Theta_GrBoundary5_LME.pdf",
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
      "Gr": 5.0,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          55.6,
          12.1,
          -31.4
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -31.4,
          12.1,
          55.6
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        15.333333333333332,
        159.66666666666666
      ],
      "weightedPm": [
        18.4,
        191.6
      ],
      "L": [
        61000000.0,
        53500.0
      ],
      "accelSafety": null,
      "safety": 19.3,
      "peak": 197.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.0
    }
  },
  {
    "id": "gr-GrBoundary5p5",
    "name": "Theta · BS100 Ga100 Gr5.5",
    "source": "../verification/Theta_GrBoundary5p5_LME.pdf",
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
      "Gr": 5.5,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          47.7,
          3.5,
          -40.8
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -40.8,
          3.5,
          47.7
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.666666666666668,
        151.16666666666669
      ],
      "weightedPm": [
        12.8,
        181.4
      ],
      "L": [
        181000000.0,
        63100.0
      ],
      "accelSafety": null,
      "safety": 19.7,
      "peak": 193.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.5
    }
  },
  {
    "id": "gr-GrBoundary5p55",
    "name": "Theta · BS100 Ga100 Gr5.55",
    "source": "../verification/Theta_GrBoundary5p55_LME.pdf",
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
      "Gr": 5.55,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          47.0,
          2.6,
          -41.8
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -41.8,
          2.6,
          47.0
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.33333333333334
      ],
      "weightedPm": [
        12.5,
        180.4
      ],
      "L": [
        194000000.0,
        64200.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.55
    }
  },
  {
    "id": "gr-GrBoundary5p553125",
    "name": "Theta · BS100 Ga100 Gr5.55312",
    "source": "../verification/Theta_GrBoundary5p553125_LME.pdf",
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
      "Gr": 5.553125,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          46.9,
          2.6,
          -41.8
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -41.8,
          2.6,
          46.9
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.25000000000003
      ],
      "weightedPm": [
        12.5,
        180.3
      ],
      "L": [
        195000000.0,
        64200.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.553125
    }
  },
  {
    "id": "gr-GrBoundary5p5546875",
    "name": "Theta · BS100 Ga100 Gr5.55469",
    "source": "../verification/Theta_GrBoundary5p5546875_LME.pdf",
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
      "Gr": 5.5546875,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          46.9,
          2.6,
          -41.9
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -41.9,
          2.6,
          46.9
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.25000000000003
      ],
      "weightedPm": [
        12.5,
        180.3
      ],
      "L": [
        195000000.0,
        64300.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.5546875
    }
  },
  {
    "id": "gr-GrBoundary5p55546875",
    "name": "Theta · BS100 Ga100 Gr5.55547",
    "source": "../verification/Theta_GrBoundary5p55546875_LME.pdf",
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
      "Gr": 5.55546875,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          41.9,
          -2.5,
          -46.9
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -41.9,
          2.5,
          46.9
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.16666666666666
      ],
      "weightedPm": [
        12.5,
        180.2
      ],
      "L": [
        195000000.0,
        64300.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.55546875
    }
  },
  {
    "id": "gr-GrBoundary5p55625",
    "name": "Theta · BS100 Ga100 Gr5.55625",
    "source": "../verification/Theta_GrBoundary5p55625_LME.pdf",
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
      "Gr": 5.55625,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          41.9,
          -2.5,
          -46.9
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -41.9,
          2.5,
          46.9
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.16666666666666
      ],
      "weightedPm": [
        12.5,
        180.2
      ],
      "L": [
        195000000.0,
        64300.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.55625
    }
  },
  {
    "id": "gr-GrBoundary5p5625",
    "name": "Theta · BS100 Ga100 Gr5.5625",
    "source": "../verification/Theta_GrBoundary5p5625_LME.pdf",
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
      "Gr": 5.5625,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          42.0,
          -2.4,
          -46.8
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -42.0,
          2.4,
          46.8
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.416666666666668,
        150.08333333333334
      ],
      "weightedPm": [
        12.5,
        180.1
      ],
      "L": [
        194000000.0,
        64400.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.5625
    }
  },
  {
    "id": "gr-GrBoundary5p575",
    "name": "Theta · BS100 Ga100 Gr5.575",
    "source": "../verification/Theta_GrBoundary5p575_LME.pdf",
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
      "Gr": 5.575,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          42.2,
          -2.2,
          -46.6
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -42.2,
          2.2,
          46.6
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.5,
        149.83333333333334
      ],
      "weightedPm": [
        12.6,
        179.8
      ],
      "L": [
        191000000.0,
        64700.0
      ],
      "accelSafety": null,
      "safety": 19.6,
      "peak": 194.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.575
    }
  },
  {
    "id": "gr-GrBoundary5p6",
    "name": "Theta · BS100 Ga100 Gr5.6",
    "source": "../verification/Theta_GrBoundary5p6_LME.pdf",
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
      "Gr": 5.6,
      "Ga": 100,
      "Gt": 0,
      "C": 1960,
      "C0": 3820
    },
    "blocks": [
      {
        "PR": [
          42.7,
          -1.8,
          -46.2
        ],
        "PT": [
          5.3,
          0.0,
          -5.3
        ]
      },
      {
        "PR": [
          -42.7,
          1.8,
          46.2
        ],
        "PT": [
          -152.4,
          -147.1,
          -141.9
        ]
      }
    ],
    "expected": {
      "PE": null,
      "Pm": [
        10.583333333333334,
        149.41666666666669
      ],
      "weightedPm": [
        12.7,
        179.3
      ],
      "L": [
        185000000.0,
        65300.0
      ],
      "accelSafety": null,
      "safety": 19.5,
      "peak": 195.0
    },
    "sourceNote": "THK LME 2026-10-16; PDF Pm includes fw, normalized by 1.2; no phase PE or safety in source",
    "changes": {
      "BS": 100,
      "Ga": 100,
      "Gr": 5.6
    }
  }
];if(typeof module!=="undefined"&&module.exports)module.exports=records;else root.LMGrExamples=records;})(typeof globalThis!=="undefined"?globalThis:this);
