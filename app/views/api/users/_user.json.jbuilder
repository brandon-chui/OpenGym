json.extract! user, :id, :username
json.image_url_big asset_url(user.avatar.url(:medium))
json.image_url asset_url(user.avatar.url(:thumb))
