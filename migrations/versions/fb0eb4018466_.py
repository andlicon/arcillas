"""empty message

Revision ID: fb0eb4018466
Revises: eafa697a5efe
Create Date: 2023-09-20 09:39:13.586794

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fb0eb4018466'
down_revision = 'eafa697a5efe'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quote_item', schema=None) as batch_op:
        batch_op.add_column(sa.Column('price', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('status', sa.Enum('PENDING', 'DONE', name='quotestatus'), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('quote_item', schema=None) as batch_op:
        batch_op.drop_column('status')
        batch_op.drop_column('price')

    # ### end Alembic commands ###
