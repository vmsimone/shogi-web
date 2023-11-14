import { ReactNode } from "react";

/**
 * The form data for creating a new user.
 */
export interface UserCreationFormData {
  categories: Category[];
  branches: Branch[];
  levels: Level[];
  fields: Field[];
}

/**
 * A category that a user can belong to.
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * A branch that a user can belong to.
 */
export interface Branch {
  id: number;
  name: string;
}

/**
 * A level that a user can have.
 */
export interface Level {
  id: number;
  name: string;
}

/**
 * A field that a user can be in.
 */
export interface Field {
  id: number;
  name: string;
}

/**
 * The request data for creating a new user.
 */
export interface UserCreationRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  password: string;
  categoryId: number;
  branchId: number;
  levelId: number;
  isNewUser: boolean;
}

// The definition of interfaces for the API responses and requests are
// subject to change based on the backend implementation.

/**
 * A user in the system.
 */
export interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  cateogry: Category;
  branch: Branch;
  level: Level;
  role: string;
}

/**
 * A tournament in the system.
 */
export interface Tournament {
  id: number;
  name: string;
  date: string;
  place: string;
  descrption: string;
  url: string;
  participants: User[];
  matches: Match[];
  rules: TournamentRule[];
}

/**
 * A match in a tournament.
 */
export interface Match {
  id: number;
  player1: User;
  player2: User;
  winnder: User;
}

/**
 * A rule for a tournament.
 */
export interface TournamentRule {
  id: number;
  name: string;
  description: string;
  timeLimit: number;
  byoyomi: number;
}

/**
 * The props for the authentication provider component.
 */
export interface AuthProviderProps {
  children: ReactNode
}

/**
 * The parameters for logging in.
 */
export interface LogInParams {
  email: string;
  password: string;
}