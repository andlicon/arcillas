"""empty message

Revision ID: ef029dd65646
Revises: 9c4926d8e01f
Create Date: 2023-08-19 09:53:27.023036

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef029dd65646'
down_revision = '9c4926d8e01f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('sub_category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sub_category_id', sa.Integer(), nullable=False))
        batch_op.create_foreign_key(None, 'sub_category', ['sub_category_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('product', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('sub_category_id')

    op.drop_table('sub_category')
    # ### end Alembic commands ###
