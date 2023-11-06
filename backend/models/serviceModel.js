import mongoose from "mongoose";
const Objectid = mongoose.Types.ObjectId;

const serviceSchema = new mongoose.Schema({
  manager_id: {
    type: Objectid,
    ref: "managers",
  },
  catering_name: {
    type: String,
  },
  catering_logo: {
    type: String,
  },
  stage_logo: {
    type: String,
  },
  vehicle_logo: {
    type: String,
  },
  decoration_logo: {
    type: String,
  },
  photograpy_logo: {
    type: String,
  },
  catering_status: {
    type: Boolean,
    default: false,
  },
  starter_status: {
    type: Boolean,
    default: false,
  },
  stage_name: {
    type: String,
  },
  stage_status: {
    type: Boolean,
    default: false,
  },
  user_stage_status: {
    type: Boolean,
    default: false,
  },
  decoration_name: {
    type: String,
  },
  decoration_status: {
    type: Boolean,
    default: false,
  },
  user_decoration_status: {
    type: Boolean,
    default: false,
  },
  photography_name: {
    type: String,
  },
  photography_status: {
    type: Boolean,
    default: false,
  },
  user_photography_status: {
    type: Boolean,
    default: false,
  },
  vehicle_name: {
    type: String,
  },
  vehicle_status: {
    type: Boolean,
    default: false,
  },
  user_vehicle_status: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  starter_menu: [
    {
      starter_name: {
        type: String,
      },
      starter_image: {
        type: String,
      },
      starter_price: {
        type: Number,
      },
    },
  ],
  main_status: {
    type: Boolean,
    default: false,
  },
  main_menu: [
    {
      main_name: {
        type: String,
      },
      main_image: {
        type: String,
      },
      main_price: {
        type: Number,
      },
    },
  ],
  dessert_status: {
    type: Boolean,
    default: false,
  },
  dessert_menu: [
    {
      dessert_name: {
        type: String,
      },
      dessert_price: {
        type: Number,
      },
      dessert_image: {
        type: String,
      },
    },
  ],
  salad_status: {
    type: Boolean,
    default: false,
  },
  salad_menu: [
    {
      salad_name: {
        type: String,
      },
      salad_price: {
        type: Number,
      },
      salad_image: {
        type: String,
      },
    },
  ],
  stageMenu: [
    {
      manager_id: {
        type: String,
      },
      stage_image: {
        type: String,
      },
      stage_budget: {
        type: Number,
      },
      stage_size: {
        type: String,
      },
    },
  ],
  decorationMenu: [
    {
      manager_id: {
        type: String,
      },
      decoration_image: {
        type: String,
      },
      decoration_amount: {
        type: Number,
      },
    },
  ],
  photographyMenu: [
    {
      photography_id: {
        type: Objectid,
      },
      category_name: {
        type: Array,
      },
      recent_photos: {
        type: Array,
      },
      shop_name: {
        type: String,
      },
      mobile_number: {
        type: Number,
      },
      address: {
        type: String,
      },
      budget: {
        type: Number,
      },
      status: {
        type: Boolean,
        default: false,
      },
    },
  ],
  vehicleMenu: [
    {
      manager_id: {
        type: String,
      },
      vehicle_image: {
        type: String,
      },
      vehicle_amount: {
        type: Number,
      },
      vehicle_name: {
        type: String,
      },
    },
  ],
});

const serviceModel = mongoose.model("services", serviceSchema);
export default serviceModel;
