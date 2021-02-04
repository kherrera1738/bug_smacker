Rails.application.routes.draw do
  resources :histories
  resources :tickets
  resources :team_members
  resources :projects
  resources :positions
  resources :organizations
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
  root "application#hello"
end
