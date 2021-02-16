Rails.application.routes.draw do
  get 'dashboard/:id', to: 'dashboards#index', as: 'user_dashboard'
  get 'dashboard/:id/main_content', to: 'dashboards#main_content'
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
