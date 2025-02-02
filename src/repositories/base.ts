export class BaseRepository<T> {
  constructor(protected model: any) {}

  create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    return this.model.create({ data })
  }

  getById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } })
  }

  getAll(): Promise<T[]> {
    return this.model.findMany()
  }

  update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.update({ where: { id }, data })
  }

  delete(id: string): Promise<T | null> {
    return this.model.delete({ where: { id } })
  }
}
