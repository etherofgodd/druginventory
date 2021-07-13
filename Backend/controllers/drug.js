import expressAsyncHandler from "express-async-handler";
import Drug from "../models/drug.js";

// @desc Get all drug
// @route Get /api/drug
// @access public

const getDrugs = expressAsyncHandler(async (req, res) => {
  const category = req.query.category
    ? {
        category: req.query.category,
      }
    : {};

  const searchKeyword = req.query.searchKeyword
    ? {
        name: {
          $regex: req.query.searchKeyword,
          $options: "i",
        },
      }
    : {};

  const Drugs = await Drug.find({ ...category, ...searchKeyword }).populate(
    "category",
    "name"
  );
  // .select("name");

  res.status(200).json({
    note: "Drugs",
    Drugs,
  });
});

// @desc Get single  drug
// @route GET /api/drug
// @access public

const getDrugById = async (req, res) => {
  try {
    const drug = await Drug.findById(req.params.id).populate(
      "category",
      "name"
    );
    res.status(200).json({
      note: "Get drug by Id",
      drug,
    });
  } catch (error) {
    console.error(error);
  }
};

// @desc Create New drug
// @route POST /api/drug
// @access Private

const createNewDrug = expressAsyncHandler(async (req, res) => {
  const { name, desc, category, dosage, price, sideEffects } = req.body;

  if (!name || !desc || !category || !dosage || !price || !sideEffects) {
    res.status(400).json({ message: "Check input params for drugs" });
    return;
  }

  const drugExists = await Drug.findOne({ name });

  if (drugExists) {
    return res.status(400).json({
      message: "Drug already exists",
    });
  }

  const drug = await Drug.create({
    name,
    desc,
    category,
    dosage,
    price,
    sideEffects,
  });

  if (!drug) {
    res.status(400).json({
      message: "bad request",
    });
    return;
  }

  if (drug) {
    res.status(201).json({
      note: "drug created",
      success: true,
    });
    return;
  }
});

// @desc Update drug
// @route PUT /api/drug
// @access Private

const updatedrug = expressAsyncHandler(async (req, res) => {
  const { name, desc, category, dosage, price, sideEffects } = req.body;

  if (!name || !desc || !category || !dosage || !price || !sideEffects) {
    res.status(400).json({ message: "Check input params for drugs" });
    return;
  }

  const drug = await Drug.findByIdAndUpdate(
    req.params.id,
    {
      name,
      desc,
      category,
      dosage,
      price,
      sideEffects,
    },
    {
      new: true,
    }
  );

  if (!drug) {
    return res.status(404).json({
      message: "Can't find drug",
    });
  }

  res.status(200).json({
    note: "drug Updated",
    success: true,
  });
});

// @desc Delete New drug
// @route Delete /api/drug/:id
// @access Private
const deletedrug = expressAsyncHandler(async (req, res) => {
  const drug = await Drug.findByIdAndRemove(req.params.id);
  !drug
    ? res.status(400).json({
        message: "drug not found",
      })
    : res.status(200).json({
        message: "drug deleted",
      });
});

export { deletedrug, getDrugs, getDrugById, createNewDrug, updatedrug };
