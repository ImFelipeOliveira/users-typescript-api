export interface DeleteUserRepositoryInterface {
  deleteUser: (params: { userId: string }) => Promise<string>;
}
