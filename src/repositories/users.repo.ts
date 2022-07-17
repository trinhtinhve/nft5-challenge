import userModel from '@models/users.model';
import { User } from '@interfaces/users.interface';

class UserRepo {
  public users = userModel;

  public findById(userId: number): User {
    return this.users.find(user => user.id === userId);
  }

  public findByEmail(email: string): User {
    return this.users.find(user => user.email === email);
  }

  public findByEmailAndPass(email: string, password: string): User {
    return this.users.find(user => user.email === email && user.password === password);
  }

  public getNextId(): number {
    return this.users.length + 1;
  }

  public getAll(): User[] {
    return this.users;
  }

  public insertUser(createUserData: User): void {
    this.users = [...this.users, createUserData];
  }
}

export default UserRepo;
