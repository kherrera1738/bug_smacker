Rails.application.routes.draw do
  get 'dashboard/:id', to: 'dashboards#index', as: 'user_dashboard'
  get 'dashboard/:id/main_content', to: 'dashboards#main_content'
  get 'dashboard/org_content/:org_id', to: 'dashboards#org_dashboard', as: 'organization_dashboard'
  get 'dashboard/project_content/:proj_id', to: 'dashboards#project_dashboard', as: 'project_dashboard'
  get 'dashboard/ticket_content/:id', to: 'dashboards#ticket_dashboard', as: 'ticket_dashboard'
  get 'dashboard/ticket/manage_roles/:id', to: 'dashboards#manage_roles', as: 'manage_roles_dashboard'
  get 'pages/home'
  get 'pages/help'
  get 'pages/about'
  resources :comments
  resources :histories
  resources :tickets
  resources :team_members
  resources :projects
  resources :positions
  get 'positions/organization/:id', to: 'positions#index_org_pos'
  resources :organizations
  devise_for :users, controllers: {
    registrations: 'registrations'
  }
  devise_scope :user do
    get '/users/all' => 'registrations#index'
  end
  root "pages#home"
end
