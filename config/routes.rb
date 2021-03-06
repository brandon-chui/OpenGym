Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :gyms do
      resources :reviews, only: [:index, :new, :update, :create, :destroy, :edit]
    end
    resources :reviews, only: [:destroy]

  end



  root "static_pages#root"
end
