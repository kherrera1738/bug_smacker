Rails.application.routes.draw do
  get 'pages/home'
  get 'pages/help'
  get 'pages/about'
  resources :comments
  resources :histories
  resources :tickets
  resources :team_members
  resources :projects
  resources :positions
  resources :organizations
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
  root "pages#home"
end
