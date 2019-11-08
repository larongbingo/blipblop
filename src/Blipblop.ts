import { Model } from "sequelize";
import { Router } from "express";

export function createCRUD() {

}

export function createModelCRUDManager() {

}

type ModelCRUDDetails = {
  model: Model;

  /**
   * Prefix before the routes
   */
  prefix?: string;

  /**
   * An array of allowed CRUD operations to do in the model
   */
  allowedCRUDOperations: [
    "create"?,
    "delete"?,
    "update"?,
    "delete"?,
  ];
};
