const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emiSchema = new Schema({
    emiOptions: {
      type: [{
        period: {
          type: String,  // E.g., 'per month', 'per year'
          enum: ['per month', 'per year'],  // Only allow monthly or yearly EMI
          required: true
        },
        amount: {
          type: Number,  // EMI amount for that period
          required: true
        },
        tenure: {
          type: String, // E.g., '3 months', '12 months'
          required: true
        }
      }],
      required: true
    },
    downPayment: {
      type: Number,  // Amount to be paid upfront
      default: 0
    }
  });

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,  // E.g., 'Printer', 'Phone', 'Dress', 'Locket'
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    originalPrice: {
      type: Number
    },
    discountedPrice: {
      type: Number
    },
    discountPercentage: {
      type: Number
    }
  },
  paymentOptions: {
    emi: emiSchema,
    cashOnDelivery: {type:Boolean,default:false},
    netBanking: {type:Boolean,default:false},
    debitCreditCard: {type:Boolean,default:false},
  },
  specifications: {
    type: Schema.Types.Mixed,  // For storing category-specific details
    required:true
  },
  seller: {
    name: {
      type: String
    },
    rating: {
      type: Number
    },
    totalRatings:{
        type:Number
    },
    reviews: {
      type: Number
    }
  },
  availableOffers:{
    type: [{
        offerType: {
            type: String,  // E.g., 'Discount', 'Buy One Get One', 'Cashback'
            required: true
        },
        description: {
            type: String,  // Detailed description of the offer
            required: true
        },
        validTill: {
            type: Date  // Expiry date of the offer
        }
    }],
  },
  features:[{
    type:{
        featureName:String,
        featureDescription:String
    }
}],
  images: [{
    type: String  // URL to images
  }],
  availability: {
    type: String,  // Example: 'In Stock', 'Out of Stock'
  },
  warranty: {
    type: String
  },
    returnPolicy: {
        type: String
    },
  importantNotes: {
    type: String
  },
  highlights: {
    type: Map,
    of: String  // We store different highlights as key-value pairs
  },
  addedOn: {
    type: Date,
    default: Date.now
  }
});

// Phone Schema
const phoneSpecificSchema = new Schema({
  screenSize: {
    type: String
  },
  processor: {
    type: String
  },
  ram: {
    type: String
  },
  batteryCapacity: {
    type: String
  },
  camera: {
    type: String
  },
  os: {
    type: String
  },
  connectivity: {
    type: String  // Examples: '4G', '5G', 'WiFi'
  },
  internalStorage: {
    type: String
  },
  color: {
    type: String
  },
  fastCharging: {
    type: Boolean
  }
});

// Printer Schema
const printerSpecificSchema = new Schema({
  printSpeedMonoA4: {
    type: Number
  },
  printSpeedColorA4: {
    type: Number
  },
  supportedOS: [String],
  interfaceSupport: [String],
  outputType: {
    type: String  // E.g., 'Color', 'Monochrome'
  },
  paperSize: {
    type: String  // E.g., 'A4', 'Legal'
  },
  inkType: {
    type: String  // E.g., 'Ink Tank', 'Laser'
  },
  scanningResolution: {
    type: String  // E.g., '600 x 1200 dpi'
  },
  features:{
    type:Map,
    of:String
  }
});

// Dress Schema
const dressSpecificSchema = new Schema({
  material: {
    type: String
  },
  size: {
    type: String  // E.g., 'S', 'M', 'L', 'XL'
  },
  color: {
    type: String
  },
  brand: {
    type: String
  },
  fitType: {
    type: String  // E.g., 'Slim Fit', 'Regular Fit'
  },
  sleeveLength: {
    type: String  // E.g., 'Short', 'Long', 'Sleeveless'
  },
  occasion: {
    type: String  // E.g., 'Casual', 'Party', 'Formal'
  }
});

// Locket Schema
const locketSpecificSchema = new Schema({
  metalType: {
    type: String  // E.g., 'Gold', 'Silver'
  },
  chainLength: {
    type: String  // E.g., '18 inches', '24 inches'
  },
  gemstone: {
    type: String  // E.g., 'Diamond', 'Ruby'
  },
  weight: {
    type: Number  // E.g., in grams
  },
  shape: {
    type: String  // E.g., 'Round', 'Heart'
  }
});

// Toy Schema
const toySpecificSchema = new Schema({
  material: {
    type: String
  },
  ageGroup: {
    type: String  // E.g., '3-5 years', '6-10 years'
  },
  batteryRequired: {
    type: Boolean
  },
  dimensions: {
    type: String  // E.g., '12 x 5 x 3 cm'
  },
  interactiveFeatures: {
    type: Boolean
  },
  safetyCertification: {
    type: Boolean
  }
});

// Food Schema
const foodSpecificSchema = new Schema({
  ingredients: {
    type: String
  },
  expirationDate: {
    type: Date
  },
  packaging: {
    type: String
  },
  nutritionalInfo: {
    type: String
  },
  quantity: {
    type: String
  },
  allergens: {
    type: String
  }
});

// Sport Schema
const sportSpecificSchema = new Schema({
  typeOfSport: {
    type: String  // E.g., 'Football', 'Basketball'
  },
  dimensions: {
    type: String
  },
  weight: {
    type: Number
  },
  material: {
    type: String
  },
  accessoriesIncluded: {
    type: String  // E.g., 'Goal Posts, Net'
  }
});

// Healthcare Schema
const healthcareSpecificSchema = new Schema({
  usage: {
    type: String
  },
  ingredients: {
    type: String
  },
  precautions: {
    type: String
  },
  dosage: {
    type: String
  },
  sideEffects: {
    type: String
  }
});

// Spec Schema
const specSpecificSchema = new Schema({
  specifications: [{
    feature: {
      type: String
    },
    value: {
      type: String
    }
  }],
  warrantyDetails: {
    type: String
  },
  packagingIncludes: {
    type: String  // E.g., 'Mobile, Charger, Case'
  }
});

// Grooming Schema
const groomingSpecificSchema = new Schema({
  productType: {
    type: String  // E.g., 'Shampoo', 'Comb', 'Oil'
  },
  ingredients: {
    type: String
  },
  applicationInstructions: {
    type: String
  },
  recommendedFor: {
    type: String  // E.g., 'Dry Hair', 'Oily Skin'
  },
  packageWeight: {
    type: String  // E.g., '200g', '500ml'
  }
});

// Book Schema
const bookSpecificSchema = new Schema({
  author: {
    type: String
  },
  genre: {
    type: String
  },
  language: {
    type: String
  },
  pages: {
    type: Number
  },
  edition: {
    type: String
  },
  publisher: {
    type: String
  },
  isbn: {
    type: String
  }
});

// Furniture Schema
const furnitureSpecificSchema = new Schema({
  material: {
    type: String
  },
  dimensions: {
    type: String
  },
  assemblyRequired: {
    type: Boolean
  },
  color: {
    type: String
  },
  weightCapacity: {
    type: Number
  },
  seatingCapacity: {
    type: String  // E.g., '1-seater', '3-seater'
  }
});

// Stationary Schema
const stationarySpecificSchema = new Schema({
  type: {
    type: String  // E.g., 'Pen', 'Notebook', etc.
  },
  quantity: {
    type: Number
  },
  brand: {
    type: String
  },
  color: {
    type: String
  },
  material: {
    type: String  // E.g., 'Paper', 'Plastic', etc.
  }
});

//bluetooth and earbuds
const bluetoothEarbudsSpecificSchema = new Schema({
    bluetoothVersion: {
      type: String,
      required: true,  // E.g., '5.0'
    },
    batteryLife: {
      type: String,  // E.g., '6 hours'
      required: true
    },
    chargingTime: {
      type: String,  // E.g., '1.5 hours'
      required: true
    },
    range: {
      type: String,  // E.g., '10 meters'
      required: true
    },
    waterResistance: {
      type: String,  // E.g., 'IPX5'
      required: true
    },
    noiseCancellation: {
      type: Boolean,
      default: false  // True or false
    },
    driverSize: {
      type: String,  // E.g., '13mm'
      required: true
    }
  });

const Product = mongoose.model('Product', productSchema);

const Phone = Product.discriminator('Phone', phoneSpecificSchema);
const Printer = Product.discriminator('Printer', printerSpecificSchema);
const Dress = Product.discriminator('Dress', dressSpecificSchema);
const Locket = Product.discriminator('Locket', locketSpecificSchema);
const Toy = Product.discriminator('Toy', toySpecificSchema);
const Food = Product.discriminator('Food', foodSpecificSchema);
const Sport = Product.discriminator('Sport', sportSpecificSchema);
const Healthcare = Product.discriminator('Healthcare', healthcareSpecificSchema);
const Spec = Product.discriminator('Spec', specSpecificSchema);
const Grooming = Product.discriminator('Grooming', groomingSpecificSchema);
const Book = Product.discriminator('Book', bookSpecificSchema);
const Furniture = Product.discriminator('Furniture', furnitureSpecificSchema);
const Stationary = Product.discriminator('Stationary', stationarySpecificSchema);
const BluetoothEarbudsSpecific = Product.discriminator('BluetoothEarbudsSpecific', bluetoothEarbudsSpecificSchema);

module.exports = { Product, Phone, Printer, Dress, Locket, Toy, Food, Sport, Healthcare, Spec, Grooming, Book, Furniture, Stationary ,BluetoothEarbudsSpecific};
