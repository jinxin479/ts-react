import * as React from 'react'
import api from './api'
export interface FormState {
  name?: string;
  number?: string;
  email?: string;
  optIn: boolean;
}
export interface StateKey{
    number: string;
    email: string;
    name: string;
}
export default class Form extends React.Component<any, FormState> {
                 state = { name: "", email: "", number: "", optIn: true };
                 handleChange = (str: keyof StateKey) => (e: React.FormEvent<HTMLInputElement>) => {
                   // const name = str as "name" | "email" |"number;
                     const newState: Partial<StateKey> = {};
                   newState[str] = e.currentTarget.value;
                   this.setState(newState);
                 };
                 handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                   e.preventDefault();
                   return api.addUser(this.state.name, this.state.email, this.state.number);
                 };
                 handlePromotionClick = () => {
                   this.setState(prevState => ({
                     optIn: !prevState.optIn
                   }));
                 };
                 render() {
                   return <form data-testid="addUserForm" onSubmit={this.handleSubmit}>
                       <h2>Request Information</h2>
                       <input data-testid="name" type="text" onChange={this.handleChange("name")} placeholder="Name" value={this.state.name} />
                       <input data-testid="email" type="text" onChange={this.handleChange("email")} placeholder="Email" value={this.state.email} />
                       <input data-testid="number" type="text" onChange={this.handleChange("number")} placeholder="Number" value={this.state.number} />
                       <div>
                         <input data-testid="checked" type="checkbox" checked={this.state.optIn}  onClick={this.handlePromotionClick} />
                         <p data-testid="promotionsP" className="promotions">
                           Receive Promotions
                         </p>
                       </div>
                       <button type="submit" data-testid="submitButton">
                         Submit
                       </button>
                     </form>;
                 }
               }