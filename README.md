## usersテーブル

|Column|Type|Options|
|------|----|-------|
|e-mail|strinng|null: false|
|password|strinng|null: false|
|nickname|strinng|null: false|
### Association
- has_many :group_users
- has_many :groups, through: :group_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :groups_users
- has_many :users, through: :group_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|group_id|integer|null: false|

### Association
- belongs_to :group
- belongs_to :user