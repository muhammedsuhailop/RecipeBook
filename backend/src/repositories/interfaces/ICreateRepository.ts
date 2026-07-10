export interface ICreateRepository<TEntity, TCreate> {
  create(payload: TCreate): Promise<TEntity>;
}
