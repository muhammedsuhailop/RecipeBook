import { Response } from "express";
import { IFavoriteService } from "../services/IFavoriteService";
import { ApiResponse } from "../../../utils/ApiResponse";
import { ApiError } from "../../../utils/ApiError";
import { HttpStatus } from "../../../constants/httpStatus.constants";
import { FavoriteMessages } from "../../../constants/favoriteMessages.constants";
import { AuthMessages } from "../../../constants/authMessages.constants";
import { AuthenticatedRequest } from "../../../middleware/auth.middleware";

export class FavoriteController {
  constructor(private readonly _favoriteService: IFavoriteService) {}

  public addFavorite = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    const userId = this.getUserId(req);
    const favorite = await this._favoriteService.addFavorite(req.body, userId);
    res
      .status(HttpStatus.CREATED)
      .json(new ApiResponse(true, FavoriteMessages.ADD_SUCCESS, favorite));
  };

  public getFavorites = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    const userId = this.getUserId(req);
    const favorites = await this._favoriteService.getFavorites(userId);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, FavoriteMessages.LIST_SUCCESS, favorites));
  };

  public removeFavorite = async (
    req: AuthenticatedRequest,
    res: Response,
  ): Promise<void> => {
    const userId = this.getUserId(req);
    const { recipeId } = req.params as unknown as { recipeId: number };
    await this._favoriteService.removeFavorite(recipeId, userId);
    res
      .status(HttpStatus.OK)
      .json(new ApiResponse(true, FavoriteMessages.REMOVE_SUCCESS));
  };

  private getUserId(req: AuthenticatedRequest): string {
    if (!req.authenticatedUser) {
      throw new ApiError(
        HttpStatus.UNAUTHORIZED,
        AuthMessages.UNAUTHORIZED_ACCESS,
      );
    }
    return req.authenticatedUser.userId;
  }
}
