## usersテーブル

|Column|Type|Options|
|------|----|-------|
|e-mail|strinng|null: false|
|password|strinng|null: false|
|nickname|strinng|null: false|
### Association
- has_many :group_users
- has_many :groups

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, 
|group_name|integer|null: false, 

### Association
- has_many :groups_users
- has_many :users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user