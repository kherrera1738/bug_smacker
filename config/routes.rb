Rails.application.routes.draw do
  resources :positions
  resources :organizations
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
  root "application#hello"
end
