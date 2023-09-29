{
    'name' : 'Ensure Positive Loyalty Points',
    'version' : '1.0.0',
    'summary': '',
    'sequence': -50,
    'description': """
    """,
    'category': 'Sales',
    'website': '',
    'depends' : ['pos_loyalty'],
    "author": "Dbsoft",
    'support': 'tonyatsevah@gmail.com',
    'maintainer': 'Tony Atsevah',
    'data': [
        # 'views/pos_config.xml',
        ],
    'assets': {
        'point_of_sale.assets': [
            'dbs_pos_loyalty_ensure_positive_points/static/src/js/ProductScreenExtend.js',
        ],
    },
    'demo': [],
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}